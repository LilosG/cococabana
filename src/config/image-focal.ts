export const FOCAL_POSITIONS = {
  center: '50% 50%',
  top: '50% 0%',
  upper: '50% 30%',
  'upper-left': '40% 30%',
  'upper-right': '60% 30%',
  'upper-center': '50% 40%',
  'center-left': '25% 50%',
  'center-right': '75% 50%',
  'lower-center': '50% 65%',
  lower: '50% 78%',
  'lower-left': '40% 67%',
  'lower-right': '60% 67%',
  bottom: '50% 100%',
} as const;

export type FocalPosition = keyof typeof FOCAL_POSITIONS;

export const DEFAULT_FOCAL_POSITION: FocalPosition = 'center';

export interface FocalContent {
  focal?: string | null;
  focalDesktop?: string | null;
}

export function isFocalPosition(value: string): value is FocalPosition {
  return value in FOCAL_POSITIONS;
}

export function resolveFocalProps({ focal, focalDesktop }: FocalContent): {
  focal: FocalPosition;
  focalDesktop?: FocalPosition;
} {
  const resolvedFocal = focal && isFocalPosition(focal)
    ? focal
    : DEFAULT_FOCAL_POSITION;
  const resolvedDesktop = focalDesktop && focalDesktop !== 'inherit' && isFocalPosition(focalDesktop)
    ? focalDesktop
    : undefined;

  return {
    focal: resolvedFocal,
    ...(resolvedDesktop ? { focalDesktop: resolvedDesktop } : {}),
  };
}
