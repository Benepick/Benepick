package com.ssafy.benepick.global.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.hibernate.Hibernate;
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

// @EnableJpaRepositories(
// 	basePackages = {"com.ssafy.benepick.domain.mydata.repository", "com.ssafy.benepick.domain.card.repository"},
// 	entityManagerFactoryRef = "bankBenepickEntityManager",
// 	transactionManagerRef = "bankBenepickTransactionManager"
// )
// @Configuration
// public class BankDataSourceConfig {
//
// 	@Bean
// 	public LocalContainerEntityManagerFactoryBean bankBenepickEntityManager(){
// 		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
// 		em.setDataSource(bankBenepickDataSource());
// 		em.setPackagesToScan(new String[]{"com.ssafy.benepick.domain.mydata.entity"
// 			, "com.ssafy.benepick.domain.card.entity"});
// 		em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
// 		Properties jpaProperties = new Properties();
// 		jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
// 		jpaProperties.put("hibernate.hbm2ddl.auto", "none"); // 여기에 ddl-auto 설정을 추가합니다.
// 		jpaProperties.put("hibernate.format_sql", "true"); // SQL 포맷팅 설정
// 		jpaProperties.put("hibernate.physical_naming_strategy", "org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl");
// 		em.setJpaProperties(jpaProperties);
// 		return em;
// 	}
//
// 	@Bean
// 	@ConfigurationProperties(prefix = "spring.bank-datasource")
// 	public DataSource bankBenepickDataSource(){
// 		return DataSourceBuilder.create().build();
// 	}
//
// 	@Bean
// 	public PlatformTransactionManager bankBenepickTransactionManager(){
// 		JpaTransactionManager transactionManager = new JpaTransactionManager();
// 		transactionManager.setEntityManagerFactory(bankBenepickEntityManager().getObject());
// 		return transactionManager;
// 	}
// }
