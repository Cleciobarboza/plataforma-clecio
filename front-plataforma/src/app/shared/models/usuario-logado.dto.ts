import { StudentProfileDTO } from '../../api/generated/model';
import { StudentBasicInfoDTO } from '../../api/generated/model/studentBasicInfoDTO';
import { StudentPreferenceUpdateDTO } from '../../api/generated/model/studentPreferenceUpdateDTO';

export interface UsuarioLogadoDTO extends StudentBasicInfoDTO, StudentPreferenceUpdateDTO, StudentProfileDTO  {
    id: string;
  
}
