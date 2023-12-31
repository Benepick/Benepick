package com.ssafy.benepick.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 *  접속 : http://localhost:8080/swagger-ui/index.html
 */

@Configuration
public class OpenApiConfig {
	@Bean
	public OpenAPI openApi() {
		final String securitySchemeName = "bearerAuth";

		return new OpenAPI()
			.addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
			.components(
				new Components()
					.addSecuritySchemes(securitySchemeName,
						new SecurityScheme()
							.name(securitySchemeName)
							.type(SecurityScheme.Type.HTTP)
							.scheme("bearer")
							.bearerFormat("JWT")
					)
			)
			.info(
				new Info()
					.title("BenePick API Document")
					.version("v0.0.1")
					.description("BenePick API 명세서입니다.")
			);
	}
}
