-- =============================================================
-- 데이터 모델 템플릿
-- 프로젝트: [프로젝트명]
-- 작성일: [YYYY-MM-DD]
-- DB: PostgreSQL
-- =============================================================

-- -----------------------------------------------------------
-- 사용자 (users)
-- 서비스��� 기본 사용자 정보를 저장한다.
-- -----------------------------------------------------------
CREATE TABLE users (
    id              BIGSERIAL       PRIMARY KEY,
    email           VARCHAR(255)    UNIQUE NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    name            VARCHAR(100)    NOT NULL,
    phone           VARCHAR(20)     NULL,
    role            VARCHAR(20)     NOT NULL DEFAULT 'user',     -- user, admin
    is_active       BOOLEAN         NOT NULL DEFAULT true,
    last_login_at   TIMESTAMPTZ     NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ     NULL
);

CREATE UNIQUE INDEX idx_users_email ON users (email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users (role);

COMMENT ON TABLE users IS '서비스 사용��';
COMMENT ON COLUMN users.role IS '역할: user(일반), admin(관리자)';
COMMENT ON COLUMN users.deleted_at IS '소프트 삭제 (NULL이면 활성)';

-- -----------------------------------------------------------
-- [테이블명] ([영문명])
-- [테이블 설명]
-- -----------------------------------------------------------
-- CREATE TABLE [영문명] (
--     id              BIGSERIAL       PRIMARY KEY,
--     [컬럼들]
--     created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
--     updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
--     deleted_at      TIMESTAMPTZ     NULL
-- );

-- =============================================================
-- 롤백 스크립트
-- =============================================================
-- DROP TABLE IF EXISTS users CASCADE;
