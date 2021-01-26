import { ValidationI } from '../tools/validators';
import { ConfigI } from "../config";
export interface QuestionI {
    type: string;
    name: string;
    message: string;
    mask?: string;
    choices?: string[];
    validate?: (input?: any, answers?: any) => ValidationI;
    default?: (input?: any) => any;
}
export default function (config: ConfigI, program: any): Promise<void>;
