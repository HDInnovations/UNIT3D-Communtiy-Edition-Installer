export interface ConfigI {
    github: string;
    web_user: string;
    install_dir: string;
    mysql_dir: string;
    repositories: string[];
    npm_packages: string[];
    packages: string[];
    answers: {
        mysql_root_pass: string;
        db_name: string;
        db_user: string;
        db_pass: string;
    };
}
export declare const config: ConfigI;
