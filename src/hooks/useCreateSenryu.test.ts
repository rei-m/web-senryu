import { renderHook, act } from '@testing-library/react-hooks';
import { SenryuRepository } from '@src/domain/repositories';
import { AppError } from '@src/types';
import { useCreateSenryu } from './useCreateSenryu';
import { SENRYU_1, genMockSenryuRepository } from '@test/mock';

describe('hooks', () => {
  describe('useCreateSenryu', () => {
    let senryuRepository: SenryuRepository;

    beforeEach(() => {
      senryuRepository = genMockSenryuRepository();
      senryuRepository.add = jest.fn(senryu => Promise.resolve(senryu.id!));
    });

    it('should return initial state', () => {
      const { result } = renderHook(() =>
        useCreateSenryu({ senryuRepository })
      );
      const { processingState, error } = result.current;
      expect(processingState).toEqual('waiting');
      expect(error).toBeNull();
    });

    it('can create senryu', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useCreateSenryu({ senryuRepository })
      );
      const { createSenryu } = result.current;
      act(() => {
        createSenryu(SENRYU_1);
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('complete');
      expect(senryuRepository.add).toHaveBeenCalledWith(SENRYU_1);
    });

    it('can catch error when fail to create senryu', async () => {
      const error: AppError = { code: 'unhandled', message: 'error' };
      senryuRepository.add = jest.fn(_senryu => Promise.reject(error));

      const { result, waitForNextUpdate } = renderHook(() =>
        useCreateSenryu({ senryuRepository: senryuRepository })
      );

      const { createSenryu } = result.current;
      act(() => {
        createSenryu(SENRYU_1);
      });

      expect(result.current.processingState).toEqual('processing');

      await waitForNextUpdate();

      expect(result.current.processingState).toEqual('waiting');
      expect(result.current.error).toEqual(error);
      expect(senryuRepository.add).toHaveBeenCalledWith(SENRYU_1);
    });
  });
});
