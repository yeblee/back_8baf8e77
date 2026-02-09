import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('SchoolMeal (NEIS API Test)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // 쿼리 string을 DTO에 맞게 변환
        transformOptions: { enableImplicitConversion: true }, // 암묵적 타입 변환 허용
      }),
    );

    await app.init();
  });

  const allergyId = [1, 2]; // 내가 보유하고 있는 알레르기 식품 번호 입력
  const page = 1;
  const limit = 4;

  it('/school_meal (GET(200)) - 한달 단위 알레르기 포함 식단 조회 api(데이터 구조, 알레르기 필터링 검증)', () => {
    return request(app.getHttpServer())
      .get('/school_meal')
      .query({
        atpt_ofcdc_sc_code: 'G10', // 대전교육청
        sd_schul_code: '7430310', // 대덕소프트웨어마이스터고
        mlsv_ym: '202503', //25년 3월분 조회
        allergy_id: allergyId,
        page: page,
        limit: limit,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(Array.isArray(res.body.data)).toBe(true);

        res.body.data.forEach((meal) => {
          const hasTargetAllergy = meal.meal_list.some((menu) =>
            menu.allergies.some((id: number) => allergyId.includes(id)),
          );

          expect(hasTargetAllergy).toBe(true);
        });

        expect(res.body.data.length).toBeLessThanOrEqual(limit);
      });
  });

  const invalidAllergyId = [30, 40]; // 올바르지 않은 알레르기 번호

  it('/school_meal (GET(400)) - 한달 단위 알레르기 포함 식단 조회 api(올바르지 않은 알레르기 번호 입력)', () => {
    return request(app.getHttpServer())
      .get('/school_meal')
      .query({
        atpt_ofcdc_sc_code: 'G10', // 대전교육청
        sd_schul_code: '7430310', // 대덕소프트웨어마이스터고
        mlsv_ym: '202503', //25년 3월분 조회
        allergy_id: invalidAllergyId,
        page: page,
        limit: limit,
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.message[0]).toContain(
          'each value in allergy_id must be one of the following values',
        );
      });
  });
});
