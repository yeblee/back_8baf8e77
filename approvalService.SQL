-- 사용할 스키마 선택
-- USE school;

CREATE TABLE USER (
    `user_id`    BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '사용자 아아디',
    `name`       VARCHAR(20)  NOT NULL COMMENT '사용자 이름',
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성된 날짜',
    `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정된 날짜'
) COMMENT = '사용자(USER) 테이블';

CREATE TABLE APPROVAL_DOCUMENT (
	`document_id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '결재 문서 아이디',
	`requester_id`	BIGINT	NOT NULL COMMENT '결재 요청자(USER) id',
	`title`			VARCHAR(255)	NOT NULL COMMENT '결재 문서 제목',
	`content`		TEXT	NULL COMMENT '결재 상세 내용',
	`status`		ENUM('PENDING', 'APPROVE', 'REJECT')	NOT NULL	DEFAULT 'PENDING' COMMENT '최종 결재 상태',
	`high_step`		INT	NOT NULL COMMENT '전체 결재 단계 수',
    `current_step`  INT NOT NULL COMMENT '현재 승인 대기 중인 단계 번호',
    `created_at` 	DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성된 날짜',
    `updated_at` 	DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정된 날짜',
	`finished_at` 	DATETIME 	NULL COMMENT '최종 승인/반려 처리 일시',
    foreign key(`requester_id`) references USER(`user_id`),
    CONSTRAINT `check_order_limit` CHECK (`current_step`<= `high_step`)
) COMMENT = '결재 문서 테이블';

CREATE TABLE APPROVAL_STEP (
	`step_id` 		BIGINT 		NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '결재 단계 아이디',
    `document_id`   BIGINT      NOT NULL COMMENT '상위 결재 문서 아이디',
    `approver_id`   BIGINT      NOT NULL COMMENT '결재자(USER) id',
    `step_order`    INT         NOT NULL COMMENT '결재 순번(숫자가 클수록 하위 결재자)',
    `state`         ENUM('WAIT', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'WAIT' COMMENT '결재 상태',
    `comment`       TEXT        NULL COMMENT '코멘트',
    `created_at`    DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성된 날짜',
    `updated_at`    DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정된 날짜',
	UNIQUE KEY `uk_document_step` (`document_id`, `step_order`), -- 한 결재 문서 내에서 하나의 결제 단계에 두명 이상 지정되는 것 금지
    FOREIGN KEY (`document_id`) REFERENCES APPROVAL_DOCUMENT(`document_id`),
    FOREIGN KEY (`approver_id`) REFERENCES USER(`user_id`)
) COMMENT = '결재 문서별 상세 결재단계 내용';

SELECT * FROM USER;
SELECT * FROM APPROVAL_DOCUMENT;
SELECT * FROM APPROVAL_STEP;

CREATE INDEX idx_step ON APPROVAL_STEP (approver_id, state, step_order);
CREATE INDEX idx_doc ON APPROVAL_DOCUMENT (document_id, status, current_step);

SELECT 
    d.document_id,
    d.title,
    u_req.name AS requester_name,  
    s.step_order AS my_turn,        
    d.high_step AS high_step,
    d.created_at
FROM APPROVAL_DOCUMENT d
JOIN APPROVAL_STEP s ON d.document_id = s.document_id
JOIN USER u_req ON d.requester_id = u_req.user_id
WHERE s.approver_id = 2             -- '2'번 사용자가 로그인했다고 가정
  AND s.state = 'WAIT'              -- 내가 아직 승인하지 않았고
  AND d.status = 'PENDING'          -- 문서 전체가 아직 진행 중이며
  AND d.current_step = s.step_order;   -- 현재 문서의 단계가 바로 내 차례일 때!
  
