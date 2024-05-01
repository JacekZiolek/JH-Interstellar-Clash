import { EGameMode } from '@/enums/EGameMode'
import type { TDeckType } from '@/types/TDeckType'

export const usePlayerOne = () => useState<string>('playerOne', () => '')
export const usePlayerTwo = () => useState<string>('playerTwo', () => '')
export const useGameMode = () => useState<EGameMode>('gameMode', () => EGameMode.onePlayer)
export const useDeckType = () => useState<TDeckType>('deckType', () => 'people')
export const useGameRunning = () => useState<boolean>('isGameRunning', () => false)
