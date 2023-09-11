package com.ssafy.benepick.global.config;


import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@EnableJpaRepositories(
	basePackages = "com.ssafy.benepick.domain.user.repository",
	entityManagerFactoryRef = "benepickEntityManager",
	transactionManagerRef = "benepickTransactionManager"
)
@Configuration
public class DataSourceConfig {
	@Primary
	@Bean
	public LocalContainerEntityManagerFactoryBean benepickEntityManager(){
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(benepickDataSource());
		em.setPackagesToScan(new String[]{"com.ssafy.benepick.domain.user.entity"});
		em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
		Properties jpaProperties = new Properties();
		jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
		jpaProperties.put("hibernate.hbm2ddl.auto", "update"); // 여기에 ddl-auto 설정을 추가합니다.
		jpaProperties.put("hibernate.format_sql", "true"); // SQL 포맷팅 설정
		jpaProperties.put("hibernate.physical_naming_strategy", "org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl");
		em.setJpaProperties(jpaProperties);
		return em;
	}

	@Primary
	@Bean
	@ConfigurationProperties(prefix = "spring.datasource")
	public DataSource benepickDataSource(){
		return DataSourceBuilder.create().build();
	}

	@Primary
	@Bean
	public PlatformTransactionManager benepickTransactionManager(){
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(benepickEntityManager().getObject());
		return transactionManager;
	}

}
