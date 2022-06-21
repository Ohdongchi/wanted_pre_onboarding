import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication): void => {
    const options = new DocumentBuilder()
        .setTitle("Wanted Pree Onborading API Dcos")
        .setDescription("원티드 프리 온보딩 Docs")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
}