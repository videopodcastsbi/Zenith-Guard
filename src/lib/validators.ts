import { z } from 'zod';

// Shared validaton schemas for API routes

// Events
export const eventSchema = z.object({
  type: z.string().min(1),
  timestamp: z.number().int().positive(),
  gameId: z.string().min(1),
  data: z.record(z.string(), z.any()),
});

// Player Data
export const playerSchema = z.object({
  playerId: z.string().min(1),
  username: z.string().min(1),
  joinTime: z.number().int().positive(),
  ipAddress: z.string().optional(),
  hardwareId: z.string().optional(),
  trustScore: z.number().min(0).max(100).optional(),
});

// Server Heartbeat
export const heartbeatSchema = z.object({
  serverId: z.string().min(1),
  gameId: z.string().min(1),
  playerCount: z.number().int().min(0),
  uptime: z.number().int().min(0),
  fps: z.number().min(0),
  timestamp: z.number().int().positive(),
});

// Detection Events
export const detectionSchema = z.object({
  type: z.enum(['exploit', 'bot', 'speedhack', 'noclip', 'fly', 'aimbot', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  playerId: z.string().min(1),
  confidence: z.number().min(0).max(100),
  details: z.record(z.string(), z.any()),
  timestamp: z.number().int().positive(),
});

// Moderation Actions
export const moderationSchema = z.object({
  action: z.enum(['kick', 'ban', 'warn', 'mute']),
  playerId: z.string().min(1),
  reason: z.string().min(1),
  duration: z.number().int().positive().optional(), // Null for permanent
  moderatorId: z.string().optional(),
});

// Webhook Configuration
export const webhookSchema = z.object({
  url: z.string().url(),
  events: z.array(z.string()).min(1),
  secret: z.string().min(16).optional(),
  active: z.boolean().default(true),
});
