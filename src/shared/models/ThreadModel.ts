/**
 * @file ThreadModel.ts
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of ThreadModel interface
 */

export interface ThreadModel {
    id?: string | null;
    description?: string | null;
    handle?: string | null;
    email?: string | null;
    name: string;
    date?: Date | null; 
}
