package com.ssafy.benepick.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ssafy.benepick.global.interceptor.JwtInterceptor;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

	private final JwtInterceptor jwtInterceptor;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 모든 요청 경로에 대해
			.allowedOriginPatterns("*")
			.allowedMethods("*") // 모든 HTTP 메소드 허용
			.allowCredentials(true);
	}

	   @Override
	   public void addInterceptors(InterceptorRegistry registry) {
	       registry.addInterceptor(jwtInterceptor).addPathPatterns("/**")
	               .excludePathPatterns("/api/user/signup","/api/user/phone","/api/card-company", "/api/health-check" , "/swagger-ui/**", "/swagger-resources/**", "/v3/api-docs/**", "/webjars/**");;
	   }
}
