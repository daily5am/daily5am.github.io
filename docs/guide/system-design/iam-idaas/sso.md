# 单点登录(SSO)

> **AI生成声明**: 本文档由AI辅助生成，旨在深入讲解单点登录(SSO)的原理、架构设计和实现方案。

## 🎯 概述

单点登录(Single Sign-On, SSO)是一种身份认证方案，允许用户使用一套凭证登录多个相关但独立的软件系统。SSO提升了用户体验，减少了密码管理的负担，同时提高了安全性。

## 📚 核心概念

### 什么是SSO

SSO允许用户在一个系统登录后，无需再次输入凭证即可访问其他关联系统。

#### SSO的优势

1. **用户体验**
   - 减少登录次数
   - 无需记住多套密码
   - 提升使用效率

2. **安全性**
   - 集中管理密码策略
   - 统一账户锁定机制
   - 集中审计和监控

3. **管理效率**
   - 统一用户管理
   - 简化账户生命周期管理
   - 降低IT支持成本

### SSO vs 传统登录

| 特性 | 传统登录 | SSO |
|------|---------|-----|
| 登录次数 | 每个系统一次 | 一次登录，全系统可用 |
| 密码管理 | 多套密码 | 一套密码 |
| 用户体验 | 差 | 好 |
| 安全性 | 分散管理 | 集中管理 |
| 实现复杂度 | 低 | 高 |

## 🏗️ SSO架构模式

### 1. 基于Cookie的SSO

最简单的SSO实现方式，适用于共享顶级域名的场景。

#### 架构设计

```
应用A (app1.example.com)
应用B (app2.example.com)
应用C (app3.example.com)
    ↓
共享Cookie域 (.example.com)
    ↓
SSO服务器 (sso.example.com)
```

#### 实现原理

1. 用户在SSO服务器登录
2. SSO服务器设置Cookie到`.example.com`域
3. 用户访问应用A，应用A检查Cookie
4. 如果Cookie有效，自动登录；否则重定向到SSO服务器

#### 优点

- 实现简单
- 性能好(无需额外请求)
- 用户体验流畅

#### 缺点

- 受域名限制(必须共享顶级域名)
- 安全性相对较低(Cookie可能被XSS攻击)
- 不支持跨域

### 2. 基于Token的SSO

使用Token传递身份信息，支持跨域场景。

#### 架构设计

```
用户 → 应用A → SSO服务器(认证) → 返回Token
  ↓
应用B → 验证Token → 自动登录
  ↓
应用C → 验证Token → 自动登录
```

#### Token类型

**JWT Token**:
- 自包含，包含用户信息
- 无需额外查询
- 可验证签名

**SAML Token**:
- XML格式
- 企业级标准
- 功能丰富

**自定义Token**:
- 简单字符串
- 需要Token验证服务
- 灵活性高

#### 实现流程

```
1. 用户访问应用A
   ↓
2. 应用A检查本地会话
   ↓ (无会话)
3. 重定向到SSO服务器
   ↓
4. SSO服务器检查SSO会话
   ↓ (无SSO会话)
5. 用户登录
   ↓
6. SSO服务器创建SSO会话，生成Token
   ↓
7. 重定向回应用A，附带Token
   ↓
8. 应用A验证Token，创建本地会话
   ↓
9. 用户访问应用B
   ↓
10. 应用B检查本地会话
    ↓ (无会话)
11. 重定向到SSO服务器
    ↓
12. SSO服务器检查SSO会话(已有)
    ↓
13. 生成Token，重定向回应用B
    ↓
14. 应用B验证Token，创建本地会话
```

### 3. 基于代理的SSO

通过反向代理统一处理认证，对应用透明。

#### 架构设计

```
用户 → 反向代理 → 检查认证
              ↓ (未认证)
          重定向到SSO服务器
              ↓ (已认证)
          转发请求到后端应用
```

#### 优点

- 对应用完全透明
- 无需修改应用代码
- 统一安全策略

#### 缺点

- 需要代理层
- 单点故障风险
- 性能开销

### 4. 基于网关的SSO

使用API网关统一处理认证和授权。

#### 架构设计

```
用户 → API网关 → 认证检查
              ↓ (未认证)
          重定向到SSO服务器
              ↓ (已认证)
          转发到后端服务(附带用户信息)
```

## 🔐 SSO实现方案

### 1. SAML 2.0 SSO

SAML 2.0是企业级SSO的标准协议。

#### SAML流程

```
1. 用户访问SP(Service Provider)
   ↓
2. SP生成SAML请求，重定向到IdP
   ↓
3. 用户在IdP认证
   ↓
4. IdP生成SAML断言
   ↓
5. IdP将断言发送回SP(HTTP POST)
   ↓
6. SP验证断言，创建会话
```

#### SAML断言结构

```xml
<saml:Assertion>
  <saml:Subject>
    <saml:NameID>user@example.com</saml:NameID>
  </saml:Subject>
  <saml:Conditions>
    <saml:AudienceRestriction>
      <saml:Audience>sp.example.com</saml:Audience>
    </saml:AudienceRestriction>
  </saml:Conditions>
  <saml:AttributeStatement>
    <saml:Attribute Name="email">
      <saml:AttributeValue>user@example.com</saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>
</saml:Assertion>
```

### 2. OpenID Connect SSO

基于OAuth 2.0和OIDC的现代SSO方案。

#### OIDC SSO流程

```
1. 用户访问应用A
   ↓
2. 应用A重定向到OIDC Provider
   ↓
3. OIDC Provider检查SSO会话
   ↓ (无会话)
4. 用户登录
   ↓
5. OIDC Provider创建SSO会话
   ↓
6. 返回ID Token和授权码
   ↓
7. 应用A验证ID Token，创建本地会话
   ↓
8. 用户访问应用B
   ↓
9. 应用B重定向到OIDC Provider
   ↓
10. OIDC Provider检查SSO会话(已有)
    ↓
11. 自动返回ID Token(无需再次登录)
    ↓
12. 应用B验证ID Token，创建本地会话
```

#### 优势

- 基于标准协议
- 支持移动应用
- 现代化架构
- 良好的安全性

### 3. CAS (Central Authentication Service)

开源的单点登录协议。

#### CAS流程

```
1. 用户访问应用
   ↓
2. 应用重定向到CAS服务器
   ↓
3. CAS服务器检查TGT(Ticket Granting Ticket)
   ↓ (无TGT)
4. 用户登录
   ↓
5. CAS服务器创建TGT，返回ST(Service Ticket)
   ↓
6. 应用用ST换取用户信息
   ↓
7. 应用创建本地会话
```

#### CAS特点

- 简单易用
- 广泛支持
- 适合学术机构
- 开源免费

## 🛡️ SSO安全设计

### 1. 会话管理

#### SSO会话

- 集中存储(Redis、数据库)
- 设置合理过期时间
- 支持会话刷新
- 支持强制登出

#### 应用会话

- 独立于SSO会话
- 可以有不同的过期策略
- 绑定到SSO会话

#### 会话同步

```
SSO会话 ←→ 应用A会话
      ←→ 应用B会话
      ←→ 应用C会话
```

### 2. Token安全

#### Token生成

- 使用强随机数
- 包含时间戳
- 签名保护
- 设置过期时间

#### Token传输

- 使用HTTPS
- 避免URL传递(使用POST)
- 使用HTTP-only Cookie
- 防止CSRF攻击

#### Token验证

- 验证签名
- 检查过期时间
- 验证受众(audience)
- 防止重放攻击

### 3. 单点登出(SLO)

允许用户在一个系统登出后，自动登出所有相关系统。

#### SLO流程

```
1. 用户在应用A登出
   ↓
2. 应用A销毁本地会话
   ↓
3. 应用A通知SSO服务器
   ↓
4. SSO服务器销毁SSO会话
   ↓
5. SSO服务器通知所有已登录应用
   ↓
6. 各应用销毁本地会话
```

#### SLO实现方式

**前端通道(Front Channel)**:
- 使用iframe轮询
- 实时性较好
- 可能有跨域问题

**后端通道(Back Channel)**:
- 服务器间直接通信
- 更可靠
- 需要应用支持回调

### 4. 安全考虑

#### 防止重放攻击

- 使用nonce
- 时间戳验证
- Token一次性使用

#### 防止CSRF攻击

- 使用state参数
- 验证referer
- 使用SameSite Cookie

#### 防止XSS攻击

- 输入验证和过滤
- 输出编码
- 使用HTTP-only Cookie
- CSP策略

## 🏗️ 实现指南

### 1. SSO服务器实现

#### 核心功能

```python
class SSOServer:
    def login(self, username, password):
        # 1. 验证用户凭证
        user = self.authenticate(username, password)
        
        # 2. 创建SSO会话
        sso_session = self.create_sso_session(user)
        
        # 3. 生成Token
        token = self.generate_token(user, sso_session)
        
        return token
    
    def validate_token(self, token):
        # 1. 验证Token签名
        # 2. 检查过期时间
        # 3. 验证SSO会话
        # 4. 返回用户信息
        pass
    
    def logout(self, sso_session_id):
        # 1. 销毁SSO会话
        # 2. 通知所有应用登出
        pass
```

#### 会话存储

```python
# 使用Redis存储SSO会话
import redis

redis_client = redis.Redis()

def create_sso_session(user_id):
    session_id = generate_session_id()
    session_data = {
        'user_id': user_id,
        'created_at': time.time(),
        'last_access': time.time()
    }
    redis_client.setex(
        f'sso_session:{session_id}',
        3600,  # 1小时过期
        json.dumps(session_data)
    )
    return session_id
```

### 2. 应用端实现

#### 认证中间件

```python
class SSOMiddleware:
    def process_request(self, request):
        # 1. 检查本地会话
        if self.has_local_session(request):
            return None
        
        # 2. 检查SSO Token
        token = request.GET.get('token')
        if token:
            user = self.validate_token(token)
            if user:
                self.create_local_session(request, user)
                return None
        
        # 3. 重定向到SSO服务器
        return redirect(f'{SSO_SERVER}/login?redirect={request.url}')
```

#### Token验证

```python
def validate_token(token):
    # 1. 调用SSO服务器验证
    response = requests.post(
        f'{SSO_SERVER}/validate',
        json={'token': token}
    )
    
    if response.status_code == 200:
        return response.json()['user']
    return None
```

### 3. 数据库设计

#### SSO会话表

```sql
CREATE TABLE sso_sessions (
  session_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  last_access TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT
);
```

#### 应用会话映射表

```sql
CREATE TABLE app_sessions (
  app_id VARCHAR(255),
  sso_session_id VARCHAR(255),
  local_session_id VARCHAR(255),
  created_at TIMESTAMP,
  PRIMARY KEY (app_id, sso_session_id)
);
```

## 📊 性能优化

### 1. 会话缓存

- 使用Redis缓存SSO会话
- 设置合理的过期时间
- 实现会话刷新机制

### 2. Token缓存

- 缓存已验证的Token
- 减少验证请求
- 使用本地缓存

### 3. 数据库优化

- 索引关键字段
- 定期清理过期会话
- 使用连接池

### 4. 负载均衡

- SSO服务器集群部署
- 会话共享(Redis)
- 负载均衡策略

## 🔍 故障排查

### 常见问题

1. **无限重定向循环**
   - 检查redirect_uri配置
   - 验证Cookie设置
   - 检查HTTPS配置

2. **Token验证失败**
   - 检查Token签名
   - 验证过期时间
   - 确认时钟同步

3. **会话丢失**
   - 检查会话存储
   - 验证过期时间
   - 检查Cookie设置

4. **跨域问题**
   - 配置CORS
   - 使用代理
   - 检查Cookie SameSite设置

## 📖 最佳实践

### 1. 用户体验

- 提供清晰的登录提示
- 显示登录状态
- 支持记住我功能
- 优雅的错误处理

### 2. 安全性

- 强制使用HTTPS
- 设置合理的会话过期时间
- 实现会话超时提醒
- 支持强制登出

### 3. 可维护性

- 统一错误码
- 完善的日志记录
- 监控和告警
- 文档完善

## 📚 推荐资源

### 标准文档

- [SAML 2.0规范](http://saml.xml.org/saml-specifications)
- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)
- [CAS协议](https://apereo.github.io/cas/)

### 开源项目

- [Keycloak](https://www.keycloak.org/) - 开源身份管理
- [CAS Server](https://apereo.github.io/cas/) - 中央认证服务
- [Spring Security SAML](https://spring.io/projects/spring-security-saml)

### 商业服务

- [Okta](https://www.okta.com/) - 企业SSO服务
- [Azure AD](https://azure.microsoft.com/services/active-directory/)
- [Auth0](https://auth0.com/) - 身份认证服务

---

*最后更新时间: 2025-01-20*

