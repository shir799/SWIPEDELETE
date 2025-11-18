/**
 * Main Screen - Duplicate Image Swiper
 * Minimalistic monochrome design
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import SwipeStack from '@/components/SwipeStack';
import {
  ImageStackIcon,
  CheckmarkIcon,
  ScanIcon,
  SwipeLeftIcon,
  SwipeRightIcon,
} from '@/components/icons';
import { ImageHash, findDuplicates, DuplicateGroup } from '@/utils/duplicateDetection';
import { loadImages, requestPermissions, deleteImage } from '@/utils/imageLoader';

type AppState = 'initial' | 'loading' | 'scanning' | 'ready' | 'complete';

export default function HomeScreen() {
  const [state, setState] = useState<AppState>('initial');
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [keptCount, setKeptCount] = useState(0);

  const startScan = async () => {
    setState('loading');

    // Request permissions
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      alert('Permission denied. Please grant access to your photos.');
      setState('initial');
      return;
    }

    setState('scanning');

    // Load images
    const images = await loadImages({ first: 500 });

    // Find duplicates
    const duplicates = findDuplicates(images, 95);

    if (duplicates.length === 0) {
      alert('No duplicates found! Your gallery is clean.');
      setState('initial');
      return;
    }

    setDuplicateGroups(duplicates);
    setState('ready');
  };

  const handleDelete = async (image: ImageHash) => {
    await deleteImage(image.id);
    setDeletedCount((prev) => prev + 1);
  };

  const handleKeep = (image: ImageHash) => {
    setKeptCount((prev) => prev + 1);
  };

  const handleGroupComplete = () => {
    const nextIndex = currentGroupIndex + 1;
    if (nextIndex >= duplicateGroups.length) {
      setState('complete');
    } else {
      setCurrentGroupIndex(nextIndex);
    }
  };

  const resetApp = () => {
    setState('initial');
    setDuplicateGroups([]);
    setCurrentGroupIndex(0);
    setDeletedCount(0);
    setKeptCount(0);
  };

  const currentGroup = duplicateGroups[currentGroupIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SWIPE DELETE</Text>
        {state === 'ready' && (
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{deletedCount}</Text>
              <Text style={styles.statLabel}>Deleted</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{keptCount}</Text>
              <Text style={styles.statLabel}>Kept</Text>
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {state === 'initial' && (
          <View style={styles.initial}>
            <ImageStackIcon size={80} color="#ffffff" />
            <Text style={styles.title}>Find & Delete{'\n'}Duplicate Photos</Text>
            <Text style={styles.subtitle}>
              Swipe left to delete, right to keep
            </Text>
            <TouchableOpacity style={styles.button} onPress={startScan}>
              <ScanIcon size={20} color="#000000" />
              <Text style={styles.buttonText}>Start Scanning</Text>
            </TouchableOpacity>
          </View>
        )}

        {(state === 'loading' || state === 'scanning') && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>
              {state === 'loading' ? 'Loading images...' : 'Scanning for duplicates...'}
            </Text>
          </View>
        )}

        {state === 'ready' && currentGroup && (
          <View style={styles.swipeContainer}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupText}>
                Group {currentGroupIndex + 1} of {duplicateGroups.length}
              </Text>
              <Text style={styles.duplicatesText}>
                {currentGroup.duplicates.length + 1} similar images
              </Text>
            </View>

            <SwipeStack
              images={[currentGroup.original, ...currentGroup.duplicates]}
              onDelete={handleDelete}
              onKeep={handleKeep}
              onComplete={handleGroupComplete}
            />

            <View style={styles.instructions}>
              <View style={styles.instruction}>
                <SwipeLeftIcon size={32} color="#dc2626" />
                <Text style={styles.instructionText}>Delete</Text>
              </View>
              <View style={styles.instruction}>
                <SwipeRightIcon size={32} color="#22c55e" />
                <Text style={styles.instructionText}>Keep</Text>
              </View>
            </View>
          </View>
        )}

        {state === 'complete' && (
          <View style={styles.complete}>
            <CheckmarkIcon size={80} color="#22c55e" />
            <Text style={styles.title}>All Done!</Text>
            <Text style={styles.completeStats}>
              Deleted {deletedCount} • Kept {keptCount}
            </Text>
            <TouchableOpacity style={styles.button} onPress={resetApp}>
              <ScanIcon size={20} color="#000000" />
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  logo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  initial: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 48,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#808080',
    marginTop: 16,
    letterSpacing: 0.5,
  },
  swipeContainer: {
    flex: 1,
  },
  groupInfo: {
    padding: 24,
    alignItems: 'center',
  },
  groupText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  duplicatesText: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  instructions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 32,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  complete: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  completeStats: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 48,
    letterSpacing: 0.5,
  },
});
