# Spring Boot自动配置原理

> **AI生成声明**: 本文档由AI辅助生成，旨在提供Spring Boot自动配置原理的完整指南。

Spring Boot的自动配置是其核心特性之一，理解自动配置原理对于深入使用Spring Boot至关重要。

## 核心问题

### 自动配置是如何工作的？

1. **@SpringBootApplication注解**
   - 包含@EnableAutoConfiguration
   - 触发自动配置

2. **spring.factories文件**
   - 定义自动配置类
   - 在META-INF/spring.factories中配置

3. **条件注解**
   - @ConditionalOnClass：类存在时生效
   - @ConditionalOnBean：Bean存在时生效
   - @ConditionalOnProperty：属性存在时生效

### 自动配置流程

1. Spring Boot启动
2. 扫描spring.factories文件
3. 加载自动配置类
4. 根据条件注解判断是否生效
5. 创建相应的Bean

## 自定义自动配置

### 1. 创建配置类

```java
@Configuration
@ConditionalOnClass(MyService.class)
@EnableConfigurationProperties(MyProperties.class)
public class MyAutoConfiguration {
    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new MyService();
    }
}
```

### 2. 配置spring.factories

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.MyAutoConfiguration
```

## 常见面试题

1. **如何禁用某个自动配置？**
   - 使用@SpringBootApplication的exclude属性
   - 配置spring.autoconfigure.exclude

2. **自动配置的优先级？**
   - 用户配置 > 自动配置
   - 使用@Order控制顺序

3. **如何自定义Starter？**
   - 创建自动配置类
   - 配置spring.factories
   - 打包发布

