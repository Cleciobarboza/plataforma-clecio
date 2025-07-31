import { StudentBasicInfoDTO } from '../../api/generated/model/studentBasicInfoDTO';
import { StudentPreferenceUpdateDTO } from '../../api/generated/model/studentPreferenceUpdateDTO';

export interface UsuarioLogadoDTO extends StudentBasicInfoDTO, StudentPreferenceUpdateDTO {}
