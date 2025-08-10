export interface InputProps {
  location?: string;
  completedStep?: number;
  services?: object;
  pry?: string;
  um?: string;
  ava?: string;
  dob?: string;
  h?: string;
  ge?: number;
  orien?: string;
  food?: string;
  urls?: string[];
  video?: string[];
  opkey?: string;
  wlmt?: number;
  slmt?: string;
  voice?: string;
  ilink?: string;
}

export interface IService {
  price?: string;
  bio?: string;
  gameTime?: string;
  avatar?: string;
  image?: string;
  title?: string;
}

export interface IStep2Props {
  setStep: (number: number) => void;
  chooseServicesModal: boolean;
  priceLimitModal: boolean;
  setChooseServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceLimitModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IServiceModalProps {
  uid: string | null | undefined;
  btnDisable: boolean;
  setBtnDisable: React.Dispatch<React.SetStateAction<boolean>>;
  service: IMeetUpService[];
  setService: React.Dispatch<React.SetStateAction<IMeetUpService[]>>;
  EMeetService: IEMeetService[];
  setEMeetService: React.Dispatch<React.SetStateAction<IEMeetService[]>>;
  gamesService: IGameService[];
  setGamesService: React.Dispatch<React.SetStateAction<IGameService[]>>;
  sportServices: ISportService[];
  setSportServices: React.Dispatch<React.SetStateAction<ISportService[]>>;
  setChooseServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMeetUpService {
  price?: string | number | undefined;
  bio?: string;
  id?: number | undefined;
  type?: string;
  image?: string;
  title?: string;
  tooltip?: string | undefined;
  suffix?: number;
}

export interface IEMeetService {
  price?: number | string | undefined;
  bio?: string;
  id?: number | undefined;
  type?: string;
  image?: string;
  title?: string;
  tooltip?: string | undefined;
  suffix?: number;
}

export interface IGameService {
  price?: string | number | undefined;
  bio?: string;
  id?: number | undefined;
  type?: string;
  image?: string;
  title?: string;
  suffixState?: string;
  suffix?: number;
  profile?: string;
}

export interface ISportService {
  price?: string | number | undefined;
  bio?: string;
  id?: number | undefined;
  type?: string;
  image?: string;
  title?: string;
  tooltip?: string | undefined;
  suffix?: number;
}
