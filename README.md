# sangoes-web

    sangoes-web,由react.js+umijs+antd后端系统,相关后端:https://github.com/sangoes/sangoes-boot

## 相关技术

   后端:
   * springboot2.x spring生态
   * mybatis-Plus
   * hutools
   * oauth2.x jwtt
   * redis
   * rabbitmq
   * HikariCP连接池
   * elk
   
   前端:
   * react.js
   * umijs
   * antd
   * braft-editor

## 相关
    
   前端:
   
   * sangoes-boot:https://github.com/sangoes/sangoes-boot
   
   后端:
    
   * sangoes-web:https://github.com/sangoes/sangoes-web

## 功能列表

   * 登录:账号登录(密码登录) 短信登录(暂时没接入短信方)
   * 用户管理:用户添加 用户删除 用户修改 绑定角色 修改密码 批量删除用户 绑定部门
   * 角色管理:添加角色 删除角色 修改角色 绑定菜单权限 批量删除角色
   * 菜单管理:添加菜单 修改菜单 删除菜单 添加权限 修改权限 删除权限 批量删除权限
   * 上传文件:OSS(阿里云)
   * 工具:cache正则删除 
   * 文档管理
   * 授权管理:添加授权 删除授权 批量删除授权
   * 部门管理:添加部门 编辑部门 删除部门
   * 字典管理:添加字典 添加子字典 删除 编辑
   * 个人中心:
## 待做 TODO

   * 链接
   * 个人中心

## 运行
    # node
    brew install node
    # yarn
    brew install yarn
    # 安装
    yarn i
    # dev
    yarn start
    # test
    yarn start UMI_ENV=test
    # prod
    yarn start UMI_ENV=prod

## 感谢

[umijs](https://github.com/umijs/umi)

[antd](https://github.com/ant-design/ant-design)

[braft-editor](https://github.com/margox/braft-editor)
