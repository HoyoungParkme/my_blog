/**
 * 테스트 템플릿: Jest / Vitest
 * 파일명: [대상].test.ts 또는 [대상].spec.ts
 * 목적: [대상 모듈]의 단위 테스트
 */

// ============================================================
// Mock 설정
// ============================================================

// jest.mock('../services/userService');
// const mockUserService = jest.mocked(userService);

// ============================================================
// 테스트 데이터
// ============================================================

const sampleUser = {
  email: 'test@example.com',
  name: '테스트유저',
  password: 'Str0ng!Pass123',
};

// ============================================================
// 정상 케이스 (Happy Path)
// ============================================================

describe('createUser', () => {
  beforeEach(() => {
    // 각 테스트 전 초기화
    // jest.clearAllMocks();
  });

  it('should return user when valid data provided', async () => {
    // Arrange
    // [테스트 데이터 준비]

    // Act
    // const result = await createUser(sampleUser);

    // Assert
    // expect(result).toEqual(expect.objectContaining({ email: sampleUser.email }));
  });

  it('should save user to database', async () => {
    // Arrange
    // Act
    // Assert
    // expect(mockRepository.create).toHaveBeenCalledWith(sampleUser);
  });
});

// ============================================================
// 에러 케이스 (Error Path)
// ============================================================

describe('createUser - errors', () => {
  it('should throw ConflictError when email already exists', async () => {
    // Arrange
    // mockRepository.findByEmail.mockResolvedValue(existingUser);

    // Act & Assert
    // await expect(createUser(sampleUser)).rejects.toThrow(ConflictError);
  });

  it('should throw ValidationError when email format is invalid', async () => {
    // Arrange
    const invalidData = { ...sampleUser, email: 'not-an-email' };

    // Act & Assert
    // await expect(createUser(invalidData)).rejects.toThrow(ValidationError);
  });
});

// ============================================================
// 경계값 (Boundary)
// ============================================================

describe('createUser - boundary', () => {
  it('should accept minimum length name (2 chars)', async () => {
    const data = { ...sampleUser, name: '가나' };
    // await expect(createUser(data)).resolves.toBeDefined();
  });

  it('should reject empty name', async () => {
    const data = { ...sampleUser, name: '' };
    // await expect(createUser(data)).rejects.toThrow(ValidationError);
  });
});
