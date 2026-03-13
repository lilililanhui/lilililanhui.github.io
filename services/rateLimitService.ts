// 每日问题限制数量
const DAILY_LIMIT = 10;

// 内存存储（生产环境建议使用 Redis）
interface RateLimitRecord {
  count: number;
  resetTime: number; // 重置时间戳
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * 获取当日结束时间戳（北京时间 00:00）
 */
function getEndOfDayTimestamp(): number {
  const now = new Date();
  // 设置为北京时间下一天的 00:00:00
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

/**
 * 清理过期记录（可选，用于内存管理）
 */
function cleanupExpiredRecords(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now >= record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * 检查是否超出速率限制
 * @param identifier 用户标识（通常是 IP 地址）
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  
  // 定期清理（每 100 次调用清理一次）
  if (Math.random() < 0.01) {
    cleanupExpiredRecords();
  }

  let record = rateLimitStore.get(identifier);

  // 如果没有记录或已过期，创建新记录
  if (!record || now >= record.resetTime) {
    record = {
      count: 0,
      resetTime: getEndOfDayTimestamp(),
    };
    rateLimitStore.set(identifier, record);
  }

  const remaining = DAILY_LIMIT - record.count;

  if (record.count >= DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: remaining,
    resetTime: record.resetTime,
  };
}

/**
 * 消耗一次配额
 * @param identifier 用户标识
 */
export function consumeRateLimit(identifier: string): void {
  const record = rateLimitStore.get(identifier);
  if (record) {
    record.count += 1;
  }
}

/**
 * 获取剩余配额信息
 * @param identifier 用户标识
 */
export function getRateLimitInfo(identifier: string): {
  remaining: number;
  total: number;
  resetTime: number;
} {
  const { remaining, resetTime } = checkRateLimit(identifier);
  return {
    remaining,
    total: DAILY_LIMIT,
    resetTime,
  };
}
