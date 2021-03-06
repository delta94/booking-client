import React from "react";
import PrivacyPolicy from "../../docs/privacyPolicy";
import { IUseModal, LANG } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";

interface Iprops {
  modalHook: IUseModal;
}

const PrivacyPolicyModal: React.FC<Iprops> = ({ modalHook }) => {
  return (
    <JDmodal
      head={{
        title: LANG("agree_to_privacy_policy")
      }}
      fullInMobile
      {...modalHook}
    >
      <PrivacyPolicy />
    </JDmodal>
  );
};

export default PrivacyPolicyModal;
