# 容灾备份

> **AI生成声明**: 本文档由AI辅助生成，旨在提供容灾备份的基础知识和实践指南。

## 🎯 学习目标

通过本章节的学习,你将能够:

- 理解容灾备份的概念和重要性
- 掌握数据备份策略
- 了解灾备架构设计
- 学习灾备演练和恢复流程

## 📚 什么是容灾备份

容灾备份(Disaster Recovery)是指为了应对灾难性事件,保证数据和业务能够快速恢复的一系列技术和管理措施。

### 容灾级别

#### 1. 数据级容灾

- **特点**: 只备份数据,恢复时需要重新部署系统
- **成本**: 低
- **恢复时间**: 较长(数小时到数天)
- **RPO**: 数小时
- **RTO**: 数小时到数天

#### 2. 应用级容灾

- **特点**: 备份数据和应用系统
- **成本**: 中等
- **恢复时间**: 中等(数分钟到数小时)
- **RPO**: 数分钟到数小时
- **RTO**: 数分钟到数小时

#### 3. 业务级容灾

- **特点**: 完整的业务系统备份,可快速切换
- **成本**: 高
- **恢复时间**: 短(数分钟)
- **RPO**: 数分钟
- **RTO**: 数分钟

## 🔍 备份策略

### 备份类型

#### 1. 全量备份

备份所有数据,适合首次备份。

**优点**: 恢复简单
**缺点**: 耗时、占用空间大

```bash
# MySQL全量备份
mysqldump -u root -p --all-databases > backup_full.sql

# 压缩备份
mysqldump -u root -p --all-databases | gzip > backup_full.sql.gz
```

#### 2. 增量备份

只备份自上次备份后变化的数据。

**优点**: 速度快、占用空间小
**缺点**: 恢复时需要多个备份文件

```bash
# MySQL增量备份(基于binlog)
mysqlbinlog --start-datetime="2024-01-01 00:00:00" \
  --stop-datetime="2024-01-02 00:00:00" \
  mysql-bin.000001 > backup_incremental.sql
```

#### 3. 差异备份

备份自上次全量备份后变化的数据。

**优点**: 平衡速度和空间
**缺点**: 恢复需要全量+差异备份

### 备份策略建议

#### 3-2-1备份策略

- **3份备份**: 3份数据副本
- **2种介质**: 至少2种不同的存储介质
- **1份异地**: 至少1份异地备份

#### 备份周期

```
每日增量备份
每周全量备份
每月归档备份
```

## 🏗️ 灾备架构

### 同城灾备

在同一城市的不同机房部署备份系统。

```
主数据中心(机房A)
  ↓ (同步)
备数据中心(机房B) - 同一城市
```

**特点**:
- 延迟低(<10ms)
- 带宽成本低
- 无法应对区域性灾难

### 异地灾备

在不同城市部署备份系统。

```
主数据中心(城市A)
  ↓ (异步同步)
备数据中心(城市B) - 不同城市
```

**特点**:
- 可应对区域性灾难
- 延迟较高(>50ms)
- 带宽成本高

### 多活架构

多个数据中心同时提供服务。

```
数据中心A(Active) ←→ 数据中心B(Active)
      双向同步
```

**特点**:
- 无主备之分
- 资源利用率高
- 数据一致性复杂

## 💾 数据备份技术

### 数据库备份

#### MySQL备份

```bash
# 1. 逻辑备份(mysqldump)
mysqldump -u root -p \
  --single-transaction \
  --master-data=2 \
  --flush-logs \
  database_name > backup.sql

# 2. 物理备份(Percona XtraBackup)
xtrabackup --backup \
  --target-dir=/backup/mysql/ \
  --user=root --password=xxx

# 3. 主从复制(实时备份)
CHANGE MASTER TO
  MASTER_HOST='slave_ip',
  MASTER_USER='repl',
  MASTER_PASSWORD='password',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=107;
```

#### Redis备份

```bash
# RDB快照备份
redis-cli --rdb /backup/redis/dump.rdb

# AOF持久化备份
# 在redis.conf中配置
appendonly yes
appendfsync everysec
```

### 文件备份

#### rsync同步

```bash
# 同步备份
rsync -avz --delete \
  /source/directory/ \
  user@backup-server:/backup/directory/

# 定时备份(配合cron)
0 2 * * * rsync -avz /data/ user@backup:/backup/
```

#### 对象存储备份

```python
import boto3

s3 = boto3.client('s3')

# 上传备份文件
s3.upload_file(
    '/local/backup/file.tar.gz',
    'backup-bucket',
    'backups/file.tar.gz'
)

# 设置生命周期策略(自动删除旧备份)
s3.put_bucket_lifecycle_configuration(
    Bucket='backup-bucket',
    LifecycleConfiguration={
        'Rules': [{
            'Id': 'Delete old backups',
            'Status': 'Enabled',
            'Expiration': {'Days': 90}
        }]
    }
)
```

## 🚀 恢复流程

### 恢复步骤

1. **评估损失**: 评估数据丢失范围
2. **选择备份**: 选择最近的可用备份
3. **恢复数据**: 执行数据恢复
4. **验证数据**: 验证数据完整性
5. **切换服务**: 切换到恢复的系统
6. **验证功能**: 验证业务功能正常

### MySQL恢复示例

```bash
# 1. 停止MySQL服务
systemctl stop mysql

# 2. 恢复全量备份
mysql -u root -p < backup_full.sql

# 3. 恢复增量备份
mysqlbinlog backup_incremental.000001 | mysql -u root -p
mysqlbinlog backup_incremental.000002 | mysql -u root -p

# 4. 启动MySQL服务
systemctl start mysql

# 5. 验证数据
mysql -u root -p -e "SELECT COUNT(*) FROM database.table;"
```

### 自动恢复脚本

```python
#!/usr/bin/env python3
import subprocess
import boto3
from datetime import datetime

def restore_from_backup(backup_file, database):
    """从备份恢复数据库"""
    print(f"开始恢复数据库: {database}")
    
    # 1. 下载备份文件
    s3 = boto3.client('s3')
    local_file = f"/tmp/{backup_file}"
    s3.download_file('backup-bucket', backup_file, local_file)
    
    # 2. 恢复数据库
    cmd = f"mysql -u root -p {database} < {local_file}"
    result = subprocess.run(cmd, shell=True, capture_output=True)
    
    if result.returncode == 0:
        print(f"数据库恢复成功: {database}")
        # 验证数据
        verify_data(database)
    else:
        print(f"数据库恢复失败: {result.stderr}")
        raise Exception("恢复失败")

def verify_data(database):
    """验证数据完整性"""
    # 检查关键表记录数
    tables = ['users', 'orders', 'products']
    for table in tables:
        cmd = f"mysql -u root -p {database} -e 'SELECT COUNT(*) FROM {table}'"
        result = subprocess.run(cmd, shell=True, capture_output=True)
        print(f"表 {table} 记录数: {result.stdout.decode()}")
```

## 📊 灾备演练

### 演练类型

#### 1. 桌面演练

在会议室讨论灾备流程,不实际执行。

**优点**: 成本低、风险小
**缺点**: 无法发现实际问题

#### 2. 部分演练

演练部分灾备流程,如数据恢复。

**优点**: 验证关键流程
**缺点**: 覆盖不全面

#### 3. 全量演练

完整演练灾备流程,包括切换。

**优点**: 全面验证
**缺点**: 成本高、风险大

### 演练频率

- **关键系统**: 每季度一次
- **重要系统**: 每半年一次
- **一般系统**: 每年一次

### 演练检查清单

- [ ] 备份数据完整性
- [ ] 恢复时间符合RTO要求
- [ ] 数据丢失在RPO范围内
- [ ] 恢复流程文档完整
- [ ] 相关人员熟悉流程
- [ ] 应急联系方式有效

## ⚠️ 注意事项

### 1. 备份验证

- 定期验证备份文件完整性
- 测试恢复流程
- 检查备份文件可读性

### 2. 备份安全

- 备份文件加密存储
- 访问权限控制
- 异地备份防止丢失

### 3. 成本控制

- 选择合适的备份策略
- 定期清理过期备份
- 使用压缩减少存储空间

## 📖 推荐资源

- [AWS灾难恢复指南](https://aws.amazon.com/disaster-recovery/)
- 《数据备份与恢复》书籍
- [MySQL备份与恢复](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)

## 💡 下一步

- 学习[故障转移](./failover.md)机制
- 了解[服务降级](./degradation.md)方案
- 掌握[高可用架构设计](./architecture-design.md)

---

*最后更新时间: 2025-01-20*

