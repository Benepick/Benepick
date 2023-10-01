package com.ssafy.benepick.global.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(
                new RedisStandaloneConfiguration(host, port)
        );
    }

    // jackson LocalDateTime mapper
//    @Bean
//    public ObjectMapper redisObjectMapper() {
//        BasicPolymorphicTypeValidator typeValidator = BasicPolymorphicTypeValidator
//                .builder()
//                .allowIfSubType(Object.class)
//                .build();
//
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS); // 역직렬화할 때 클래스에 기본 생성자가 없거나 값에 Null이 있으면 오류가 발생한다.
//        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
//        mapper.registerModules(new JavaTimeModule(),new Jdk8Module()); // LocalDateTime 매핑을 위해 모듈 활성화
//        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // deserialize시 알지 못하는 property가 오더라도 실패하지 않도록 처리하여 견고함의 원칙(Robustness Principle)을 지킨다.
//        mapper.activateDefaultTyping(typeValidator, ObjectMapper.DefaultTyping.NON_FINAL); // Object로 저장한 값을 역직렬화 할때 LinkedHashMap 으로 인식하여 오류가 발생한다. Object로 인식할 수 있게 설정해야 한다.
//        return mapper;
//    }


//    @Bean
//    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
//        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setConnectionFactory(redisConnectionFactory);
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(redisObjectMapper()));
//        return redisTemplate;
//    }


    @Bean
    public CacheManager cacheManager() {
        BasicPolymorphicTypeValidator typeValidator = BasicPolymorphicTypeValidator
                .builder()
                .allowIfSubType(Object.class)
                .build();

        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS); // 역직렬화할 때 클래스에 기본 생성자가 없거나 값에 Null이 있으면 오류가 발생한다.
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
        mapper.registerModules(new JavaTimeModule(),new Jdk8Module()); // LocalDateTime 매핑을 위해 모듈 활성화
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // deserialize시 알지 못하는 property가 오더라도 실패하지 않도록 처리하여 견고함의 원칙(Robustness Principle)을 지킨다.
        mapper.activateDefaultTyping(typeValidator, ObjectMapper.DefaultTyping.NON_FINAL); // Object로 저장한 값을 역직렬화 할때 LinkedHashMap 으로 인식하여 오류가 발생한다. Object로 인식할 수 있게 설정해야 한다.


        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer(mapper))) // Value Serializer 변경
                .entryTtl(Duration.ofMinutes(30)); // 캐시 수명 30분

        return RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisConnectionFactory()).cacheDefaults(redisCacheConfiguration).build();
    }

}
