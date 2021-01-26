export declare const debug: (message: string) => void;
export declare const warning: (message: string) => void;
export declare const success: (message: string) => void;
export declare const error: (message: string) => void;
export declare const info: (message: string) => void;
export declare const header: (message: string) => void;
export declare function spawn(command: string, args?: never[], options?: {}): string;
export declare function ask(questions: any[]): Promise<any>;
