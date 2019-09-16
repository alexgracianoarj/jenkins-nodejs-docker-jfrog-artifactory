import * as winston from "winston";
import {format} from "winston";

export class Logger {
    constructor(){}

    public initLogger = () =>
        winston.createLogger({
            transports : [
                new winston.transports.File({
                    level: 'error',
                    format: this.filterOnly('error'),
                    filename: 'log/serverError.log',
                    handleExceptions: true,
                    maxsize : 5000000
                }),
                new winston.transports.File({
                    level: 'warn',
                    format: this.filterOnly('warn'),
                    filename: 'log/serverWarn.log',
                    handleExceptions: true,
                    maxsize : 5000000
                }),
                new winston.transports.File({
                    level: 'info',
                    format: this.filterOnly('info'),
                    filename: 'log/serverInfo.log',
                    handleExceptions: true,
                    maxsize : 5000000
                })
            ]
        });

    private filterOnly(level) {
        return format(function (info) {
            if (info['level'] === level) {
                return info;
            }
        })();
    }
}