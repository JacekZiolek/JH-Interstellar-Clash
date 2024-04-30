import type { EGameMode } from '@/enums/EGameMode'

export const usePlayerOne = () => useState<string>('playerOne', () => '')
export const usePlayerTwo = () => useState<string>('playerTwo', () => '')
export const useGameMode = () => useState<EGameMode | null>('gameMode', () => null)
