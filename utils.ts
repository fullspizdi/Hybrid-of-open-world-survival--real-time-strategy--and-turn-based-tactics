import { randomInt } from 'crypto';

/**
 * Utility functions to support various game mechanics.
 */

/**
 * Generates a random integer within a specified range.
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (exclusive).
 * @returns A random integer between min and max.
 */
export function getRandomInt(min: number, max: number): number {
    return randomInt(min, max);
}

/**
 * Shuffles an array using the Fisher-Yates (Durstenfeld) shuffle algorithm.
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param num - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.max(min, Math.min(num, max));
}

/**
 * Calculates the distance between two points in 2D space.
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 * @returns The distance between the two points.
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Converts degrees to radians.
 * @param degrees - The angle in degrees.
 * @returns The angle in radians.
 */
export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 * @param radians - The angle in radians.
 * @returns The angle in degrees.
 */
export function radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

/**
 * Simple logging function for debugging purposes.
 * @param message - The message to log.
 */
export function log(message: string): void {
    console.log(message);
}

