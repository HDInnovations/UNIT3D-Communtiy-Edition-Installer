export interface ValidationI {
    valid: boolean;
    error?: string;
}
export declare const NotEmpty: (input: string) => ValidationI;
export declare const Length: (input: any[], length: number) => ValidationI;
export declare const MinLength: (input: any[], length: number) => ValidationI;
export declare const MaxLength: (input: any[], length: number) => ValidationI;
export declare const LengthBetween: (input: any[], min: number, max: number) => ValidationI;
export declare const NoSpecialChars: (input: string) => ValidationI;
export declare const LimitSpecialChars: (input: string) => ValidationI;
export declare const Domain: (input: string) => ValidationI;
export declare const Ip: (input: string) => ValidationI;
export declare const Email: (input: string) => ValidationI;
export declare const Password: (input: string) => ValidationI;
export declare const confirmPassword: (input: string, compareTo: string) => ValidationI;
