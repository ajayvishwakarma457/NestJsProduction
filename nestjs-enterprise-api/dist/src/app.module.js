"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const nestjs_pino_1 = require("nestjs-pino");
const health_module_1 = require("./modules/health/health.module");
const users_module_1 = require("./modules/users/users.module");
const prisma_module_1 = require("./infrastructure/database/prisma.module");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
const request_id_interceptor_1 = require("./shared/interceptors/request-id.interceptor");
const env_validation_1 = require("./config/env.validation");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                validationSchema: env_validation_1.envValidationSchema,
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    pinoHttp: {
                        level: config.get('LOG_LEVEL', 'info'),
                        redact: ['req.headers.authorization', 'req.headers.cookie'],
                        transport: config.get('NODE_ENV') === 'development'
                            ? { target: 'pino-pretty', options: { singleLine: true } }
                            : undefined,
                    },
                }),
            }),
            prisma_module_1.PrismaModule,
            health_module_1.HealthModule,
            users_module_1.UsersModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: http_exception_filter_1.HttpExceptionFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: request_id_interceptor_1.RequestIdInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map