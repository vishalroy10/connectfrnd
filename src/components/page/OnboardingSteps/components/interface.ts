// interface InputProps {
//   location?: string;
//   completedStep?: number;
//   services?: object;
//   pry?: string;
//   um?: string;
//   ava?: string;
//   dob?: string;
//   h?: string;
//   ge?: number;
//   orien?: string;
//   food?: string;
//   urls?: string[];
//   video?: string[];
//   opkey?: string;
//   wlmt?: number;
//   slmt?: string;
//   voice?: string;
//   ilink?: string;
// }

// interface IService {
//   price?: string;
//   bio?: string;
//   gameTime?: string;
//   avatar?: string;
//   image?: string;
//   title?: string;
// }

// interface IStep2Props {
//   setStep: (number: number) => void;
//   chooseServicesModal: boolean;
//   priceLimitModal: boolean;
//   setChooseServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
//   setPriceLimitModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface IServiceModalProps {
//   uid: string | null | undefined;
//   btnDisable: boolean;
//   setBtnDisable: React.Dispatch<React.SetStateAction<boolean>>;
//   service: IMeetUpService[];
//   setService: React.Dispatch<React.SetStateAction<IMeetUpService[]>>;
//   EMeetService: IEMeetService[];
//   setEMeetService: React.Dispatch<React.SetStateAction<IEMeetService[]>>;
//   gamesService: IGameService[];
//   setGamesService: React.Dispatch<React.SetStateAction<IGameService[]>>;
//   sportServices: ISportService[];
//   setSportServices: React.Dispatch<React.SetStateAction<ISportService[]>>;
//   setChooseServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface IMeetUpService {
//   price?: string | undefined;
//   bio?: string;
//   id?: number | undefined;
//   type?: string;
//   image?: string;
//   title?: string;
//   tooltip?: string | undefined;
//   suffix?: number;
// }

// interface IEMeetService {
//   price?: string | undefined;
//   bio?: string;
//   id?: number | undefined;
//   type?: string;
//   image?: string;
//   title?: string;
//   tooltip?: string | undefined;
//   suffix?: number;
// }

// interface IGameService {
//   price?: string | undefined;
//   bio?: string;
//   id?: number | undefined;
//   type?: string;
//   image?: string;
//   title?: string;
//   suffixState?: string;
//   suffix?: number;
//   profile?: string;
// }

// interface ISportService {
//   price?: string | undefined;
//   bio?: string;
//   id?: number | undefined;
//   type?: string;
//   image?: string;
//   title?: string;
//   tooltip?: string | undefined;
//   suffix?: number;
// }

export type priceLimitModalProps = {
  creditAmount: number | undefined;
  setCreditAmount: (arg: number) => void;
  selectedRadioValue: number | undefined;
  setSelectedRadioValue: (arg: number) => void;
  handleDone: () => void;
  marksVal: number | undefined;
  setMarksVal: (arg: number) => void;
  isModel?: boolean
};
