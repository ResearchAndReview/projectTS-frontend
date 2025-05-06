import ky from 'ky';
import { API_URL } from '@/lib/utils';

let nodeId: string | undefined = undefined;

/**
 * Initializes the Node ID if not already set.
 * Returns the Node ID (either from memory or after initialization).
 */
export const getNodeId = async (): Promise<string | undefined> => {
  if (nodeId) return nodeId;

  const stored = await chrome.storage.local.get('nodeId');

  if (stored.nodeId) {
    nodeId = stored.nodeId;
    console.log('[NodeID] Loaded from storage:', nodeId);
    return nodeId;
  }

  try {
    const instance = ky.create({ prefixUrl: API_URL });
    const { uuid } = await instance.post<{ uuid: string }>('node/register').json();
    await chrome.storage.local.set({ nodeId: uuid });
    nodeId = uuid;
    console.log('[NodeID] Registered new node:', nodeId);
    return nodeId;
  } catch (err) {
    console.error('[NodeID] Failed to register node:', err);
    return undefined;
  }
};
