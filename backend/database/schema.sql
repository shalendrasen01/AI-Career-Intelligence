-- ============================================
-- AI Career Intelligence System
-- Database Schema
-- ============================================

-- 1. USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 2. SKILLS
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. USER SKILLS
CREATE TABLE user_skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, skill_id)
);


-- 4. JOBS
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    location VARCHAR(255),
    description TEXT NOT NULL,
    experience_required VARCHAR(100),
    salary_min NUMERIC,
    salary_max NUMERIC,
    job_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 5. JOB SKILLS
CREATE TABLE job_skills (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    importance INTEGER CHECK (importance BETWEEN 1 AND 5),

    FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE CASCADE,

    UNIQUE(job_id, skill_id)
);

