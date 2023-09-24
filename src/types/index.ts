export interface UploadBody {
  svg: string;
  value: string;
  key: string;
  name: string;
}

export interface QrUploadProps {
  upload: {
    isSuccess: boolean;
    isLoading: boolean;
    qrCode: string;
  };
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
}

export interface QrProps {
  qrCode: string;
  value: string;
}

export interface ShareLinksProps {
  url: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AuthInfos {
  name?: string;
  email: string;
  password: string;
  terms?: boolean;
}

export interface AuthFormTypes {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface QrCardTypes {
  qrCode: string;
  value: string;
  name: string;
  key: string;
  created_at: Date;
  created_by: string;
}
