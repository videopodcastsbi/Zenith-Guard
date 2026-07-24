// ============================================================================
// Zenith-Guard Core Type Definitions
// ============================================================================

// --- User & Auth ---
export type UserRole = 'user' | 'admin' | 'moderator';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  subscription: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  createdAt: string;
  lastLoginAt: string;
}

// --- Games ---
export type GameStatus = 'active' | 'inactive' | 'suspended';

export interface Game {
  id: string;
  name: string;
  robloxPlaceId: string;
  ownerId: string;
  status: GameStatus;
  playerCount: number;
  serverCount: number;
  securityScore: number;
  detectionCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailGradient: string;
}

// --- API Keys ---
export interface ApiKey {
  id: string;
  gameId: string;
  name: string;
  key: string;
  lastUsedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

// --- Detection Events ---
export type DetectionType =
  | 'speed_hack'
  | 'fly_hack'
  | 'teleport'
  | 'noclip'
  | 'remote_spam'
  | 'remote_abuse'
  | 'invalid_request'
  | 'abnormal_movement'
  | 'impossible_position'
  | 'high_execution'
  | 'item_duplication'
  | 'currency_exploit'
  | 'inventory_manipulation'
  | 'impossible_damage'
  | 'character_state_anomaly';

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface DetectionEvent {
  id: string;
  gameId: string;
  gameName: string;
  playerId: string;
  playerName: string;
  playerUserId: string;
  type: DetectionType;
  reason: string;
  severity: Severity;
  riskScore: number;
  serverId: string;
  serverRegion: string;
  timestamp: string;
  recommendedAction: string;
  metadata?: Record<string, unknown>;
}

// --- Players ---
export interface Player {
  id: string;
  username: string;
  userId: string;
  avatarUrl?: string;
  riskScore: number;
  totalAlerts: number;
  lastSeen: string;
  firstSeen: string;
  gamesPlayed: string[];
  status: 'clean' | 'flagged' | 'banned' | 'under_review';
}

export interface PlayerAlert {
  id: string;
  playerId: string;
  gameId: string;
  gameName: string;
  type: DetectionType;
  severity: Severity;
  reason: string;
  timestamp: string;
  resolved: boolean;
}

// --- Servers ---
export type ServerStatus = 'online' | 'offline' | 'degraded';

export interface GameServer {
  id: string;
  gameId: string;
  serverId: string;
  region: string;
  status: ServerStatus;
  playerCount: number;
  maxPlayers: number;
  uptime: number;
  lastHeartbeat: string;
  detectionCount: number;
}

// --- Moderation ---
export type ModerationAction =
  | 'flag'
  | 'log'
  | 'notify'
  | 'verify'
  | 'restrict'
  | 'kick'
  | 'temp_ban'
  | 'perm_ban';

export interface ModerationRecord {
  id: string;
  gameId: string;
  gameName: string;
  playerId: string;
  playerName: string;
  action: ModerationAction;
  reason: string;
  severity: Severity;
  executedBy: string;
  timestamp: string;
  expiresAt?: string;
  status: 'pending' | 'executed' | 'expired' | 'revoked';
}

// --- Webhooks ---
export type WebhookType = 'discord' | 'email' | 'custom';

export interface Webhook {
  id: string;
  gameId: string;
  name: string;
  type: WebhookType;
  url: string;
  isActive: boolean;
  events: DetectionType[];
  minSeverity: Severity;
  createdAt: string;
  lastTriggeredAt: string | null;
}

// --- Child Safety ---
export type ContentTag = 'violence' | 'scary' | 'chat_risk' | 'gambling' | 'mature_themes';
export type SafetyRating = 'safe' | 'caution' | 'warning' | 'restricted';

export interface ChildSafetyRating {
  id: string;
  gameId: string;
  gameName: string;
  rating: SafetyRating;
  contentTags: ContentTag[];
  recommendedMinAge: number;
  violenceLevel: number;
  scaryContentLevel: number;
  chatRiskLevel: number;
  parentalWarnings: string[];
  lastAssessedAt: string;
}

// --- Analytics ---
export interface AnalyticsData {
  detectionCount: number;
  alertsPerHour: number;
  avgResponseTime: number;
  securityScore: number;
  topEventTypes: { type: string; count: number }[];
  topFlaggedPlayers: { name: string; alerts: number; riskScore: number }[];
  mostActiveServers: { id: string; region: string; events: number }[];
}

export interface ChartDataPoint {
  time: string;
  value: number;
  label?: string;
}

export interface TimeSeriesData {
  name: string;
  data: ChartDataPoint[];
}

// --- Dashboard Stats ---
export interface DashboardStats {
  protectedGames: number;
  onlinePlayers: number;
  detectionEvents24h: number;
  suspiciousActivity24h: number;
  apiStatus: 'operational' | 'degraded' | 'down';
  securityScore: number;
}

// --- Admin ---
export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
  requestsPerMinute: number;
  errorRate: number;
  avgLatency: number;
  services: {
    name: string;
    status: 'healthy' | 'degraded' | 'down';
    latency: number;
  }[];
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'maintenance';
  isActive: boolean;
  createdAt: string;
  expiresAt: string | null;
  createdBy: string;
}

// --- Notifications ---
export type NotificationType = 'alert' | 'info' | 'warning' | 'success';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// --- API Response Types ---
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
