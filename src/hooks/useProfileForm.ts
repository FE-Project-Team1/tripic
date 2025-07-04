import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { validAccountName } from '../api/signupApi';
import { uploadImage, getImageUrl } from '../api/imageApi';
import type { IProfile } from '../types/commonType';

interface UseProfileFormOptions {
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  enableImageUpload?: boolean;
  enableAccountValidation?: boolean;
}

export function useProfileForm(options: UseProfileFormOptions = {}) {
  const {
    mode = 'onBlur',
    enableImageUpload = false,
    enableAccountValidation = false,
  } = options;

  // 계정명 검증 상태
  const [accountNameError, setAccountNameError] = useState('');
  const [accountNameSuccess, setAccountNameSuccess] = useState('');
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);

  // 이미지 파일 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // React Hook Form 설정
  const form = useForm<IProfile>({ mode });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const username = watch('username');
  const accountName = watch('accountName');
  const intro = watch('intro');

  // 계정명 API 검증
  const accountNameMutation = useMutation({
    mutationFn: validAccountName,
    onSuccess: (data) => {
      setAccountNameError('');
      setAccountNameSuccess(data.message);
      setIsAccountNameValid(true);
    },
    onError: (error) => {
      if (error instanceof Error) {
        setAccountNameError(error.message);
      } else {
        setAccountNameError('계정 ID 검증에 실패했습니다.');
      }
      setAccountNameSuccess('');
      setIsAccountNameValid(false);
    },
  });

  // 이미지 업로드 뮤테이션
  const imageUploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log('이미지 업로드 성공:', data);
      setIsUploading(false);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      setIsUploading(false);
      alert('이미지 업로드에 실패했습니다.');
    },
  });

  // 이미지 파일 선택 핸들러
  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
  };

  // 계정명 검증 핸들러
  const handleValidateAccountName = (accountName: string) => {
    if (!enableAccountValidation) return;

    setAccountNameError('');
    setAccountNameSuccess('');
    setIsAccountNameValid(false);
    accountNameMutation.mutate(accountName);
  };

  // 이미지 업로드 처리
  const uploadImageIfSelected = async (): Promise<string> => {
    if (!enableImageUpload || !selectedImage) return '';

    try {
      setIsUploading(true);
      const result = await imageUploadMutation.mutateAsync(selectedImage);
      return getImageUrl(result.info.filename);
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      throw error;
    }
  };

  // 폼 유효성 검사
  const isFormValid =
    username &&
    accountName &&
    intro &&
    (!enableAccountValidation || isAccountNameValid) &&
    !errors.username &&
    !errors.accountName &&
    !errors.intro;

  const isLoading =
    isUploading ||
    accountNameMutation.isPending ||
    imageUploadMutation.isPending;

  return {
    // Form methods
    register,
    handleSubmit,
    errors,
    watch,

    // Validation state
    accountNameError,
    accountNameSuccess,
    isAccountNameValid,

    // Image state
    selectedImage,
    isUploading,

    // Handlers
    handleImageSelected,
    handleValidateAccountName,
    uploadImageIfSelected,

    // Computed state
    isFormValid,
    isLoading,

    // Watched values
    username,
    accountName,
    intro,
  };
}
