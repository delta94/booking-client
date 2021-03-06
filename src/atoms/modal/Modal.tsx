import React, { Fragment, useEffect, useState, useMemo } from "react";
import ReactModal from "react-modal";
import "./Modal.scss";
import classNames from "classnames";
import Button from "../button/Button";
import { IUseModal, LANG } from "../../hooks/hook";
import { s4 } from "../../utils/utils";
import ModalEndSection from "./components/ModalEndSection";
import ModalHeadSection, {
  IPropsModalHeadProps
} from "./components/ModalHeadSection";
import Preloader from "../preloader/Preloader";
import { TElements } from "../../types/interface";

export interface JDmodalConfigProps {
  head?: IPropsModalHeadProps;
  center?: boolean;
  loading?: boolean;
  isAlert?: boolean;
  foot?: TElements;
  isUnderHeader?: boolean;
  confirm?: boolean;
  children?: any;
  minWidth?: string;
  minContentsWidth?: string;
  noAnimation?: boolean;
  visibleOverflow?: boolean;
  falseMessage?: string | any[];
  trueMessage?: string | any[];
  contentClassName?: string;
  fullInMobile?: boolean;
  id?: string;
  contentWrapStyle?: React.CSSProperties;
  confirmCallBackFn?(flag: boolean, key?: string): any;
}

interface IProps extends ReactModal.Props, IUseModal, JDmodalConfigProps {}

// let CAN_CLOSE_MODAL = false;

const JDmodal: React.SFC<IProps> = ({
  info,
  center,
  head,
  className,
  isUnderHeader,
  isOpen,
  minContentsWidth,
  minWidth,
  closeModal,
  isAlert,
  children,
  confirm,
  style,
  foot,
  confirmCallBackFn = info?.confirmCallBackFn,
  visibleOverflow,
  trueMessage,
  noAnimation = true,
  falseMessage,
  loading,
  fullInMobile,
  contentClassName = "JDmodal__body",
  contentWrapStyle: contentWrapStyleProp,
  appElement = document.getElementById("root") ||
    document.getElementsByTagName("body"),
  ...props
}) => {
  const [shouldAnimation, setShouldAnimation] = useState(!noAnimation);

  // 여기에서 info로 들어온것과 openModal 명렁으로 들어온것들 조합함
  const inInfo = (() => {
    let inInInfo: any = {};

    if (info && info.trueBtns) {
      inInInfo.trueMessage = info.trueBtns || trueMessage;
    }
    if (info && info.falseBtns) {
      inInInfo.falseMessage = info.falseBtns || falseMessage;
    }

    return inInInfo;
  })();

  // 👿 curtton => overlay

  const overlayClassNames = classNames("JDmodal-overlay", undefined, {
    "JDmodal-overlay--noAnimation": !shouldAnimation,
    "JDmodal-overlay--underHeader": isUnderHeader
  });

  const classes = classNames("Modal JDmodal", className, {
    "JDmodal--center": center,
    "JDmodal--visibleOverflow": visibleOverflow,
    "JDmodal--alert": isAlert || confirm,
    "JDmodal--alertWaring": info && info.thema === "warn",
    "JDmodal--noAnimation": !shouldAnimation,
    "JDmodal--loading": loading,
    "JDmodal--fullInMobile": fullInMobile
  });

  const defualtJDmodalProps = {
    className: `Modal ${classes}`,
  overlayClassName: "Overlay"
  };

  const hanldeClickBtn = (flag: boolean, key?: string) => {
    confirmCallBackFn && confirmCallBackFn(flag, key);
    info && info.callBack && info.callBack(flag, key);
    closeModal();
  };

  const sharedTrueBtnProp: any = {
    thema: "primary",
    mode: "flat",
    onClick: () => {
      hanldeClickBtn(true);
    },
    label: trueMessage || LANG("confirm")
  };

  const sharedFalseBtnProp: any = {
    mode: "flat",
    thema: "warn",
    onClick: () => {
      hanldeClickBtn(false);
    },
    label: falseMessage || LANG("close")
  };

  const misClickPreventCloseModal = () => {
    // if (CAN_CLOSE_MODAL) {
    closeModal();
    // }
  };

  const modalStyle = {
    minWidth: loading || minWidth,
    ...style
  };

  const modalContentsStyle = {
    minWidth: minContentsWidth,
    ...contentWrapStyleProp
  };

  const getChildren = () => (
    <div className={contentClassName} style={modalContentsStyle}>
      {children}
      {info && info.children}
      {typeof info === "string" && info}
      {info && info.txt}
    </div>
  );

  if (loading) {
    return (
      <ReactModal
        {...defualtJDmodalProps}
        {...props}
        shouldCloseOnOverlayClick
        overlayClassName={overlayClassNames}
        isOpen={true}
      >
        <Preloader loading={true} size="large" />
      </ReactModal>
    );
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={misClickPreventCloseModal}
      {...props}
      {...defualtJDmodalProps}
      appElement={appElement}
      // @ts-ignore
      style={{ content: { ...modalStyle } }}
      overlayClassName={overlayClassNames}
      shouldCloseOnOverlayClick
    >
      <div>
        {head && <ModalHeadSection closeFn={closeModal} {...head} />}
        {getChildren()}
        {foot && <div className="JDmodal__endSection">{foot}</div>}
        {confirm && (
          <Fragment>
            <ModalEndSection className="JDmodal__endSection--confirm">
              {inInfo.trueMessage instanceof Array ? (
                inInfo.trueMessage.map((message: any) => (
                  <Button
                    key={s4()}
                    {...sharedTrueBtnProp}
                    className="TConfirmTureBtn"
                    label={`${message.msg}`}
                    onClick={() => {
                      hanldeClickBtn(true, message.callBackKey);
                    }}
                  />
                ))
              ) : (
                <Button {...sharedTrueBtnProp} />
              )}
              {inInfo.falseMessage instanceof Array ? (
                inInfo.falseMessage.map((message: any) => (
                  <Button
                    key={s4()}
                    {...sharedFalseBtnProp}
                    className="TConfirmFalseBtn"
                    label={`${message}`}
                    onClick={() => {
                      hanldeClickBtn(false, message.callBackKey);
                    }}
                  />
                ))
              ) : (
                <Button {...sharedFalseBtnProp} />
              )}
            </ModalEndSection>
          </Fragment>
        )}
      </div>
    </ReactModal>
  );
};

export default JDmodal;

const JDtoastModal = JDmodal;
export { JDtoastModal };
