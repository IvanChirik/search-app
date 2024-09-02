import { ConfigService } from "@nestjs/config";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions()
    }
};

const getMongoString = (configService: ConfigService) => {
    const login = configService.get('MONGO_LOGIN');
    const password = configService.get('MONGO_PASSWORD');
    const host = configService.get('MONGO_HOST');
    const port = configService.get('MONGO_PORT');
    const db_name = configService.get('MONGO_AUTH_DATABASE');
    return `mongodb://${login}:${password}@${host}:${port}/${db_name}`;
};

const getMongoOptions = () => ({

});