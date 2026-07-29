import React, { Children, isValidElement, ReactElement, Fragment } from 'react';

export interface SwitchProps<T = any> extends React.PropsWithChildren {
  value: T;
}
export interface CaseProps<T = any> extends React.PropsWithChildren {
  case: T;
}
export interface DefaultProps extends React.PropsWithChildren {}

// 内部类型定义
const CaseType = Symbol('Case');
const DefaultType = Symbol('Default');

export const Case: React.FC<CaseProps> & { _type: typeof CaseType } = ({ children }) => <React.Fragment>{children}</React.Fragment>;
Case._type = CaseType;

export const Default: React.FC<DefaultProps> & { _type: typeof DefaultType } = ({ children }) => <React.Fragment>{children}</React.Fragment>;
Default._type = DefaultType;

export const Switch: React.FC<SwitchProps> & { Case: typeof Case; Default: typeof Default;} = ({ value, children }) => {
  let defaultElement: React.ReactNode = null;
  let hasMatch = false;

  const renderContent = Children.map(children, (child) => {
    if (!isValidElement(child)) return null;

    const childElement = child as ReactElement;

    // 处理 Case 组件
    if ((childElement.type as any)?._type === CaseType) {
      const caseProps = childElement.props as CaseProps;
      if (!hasMatch && caseProps.case === value) {
        hasMatch = true;
        return caseProps.children;
      }
      return null;
    }

    // 处理 Default 组件
    if ((childElement.type as any)?._type === DefaultType) {
      const defaultProps = childElement.props as DefaultProps;
      defaultElement = defaultProps.children;
      return null;
    }
    console.warn('Switch 组件只接受 Switch.Case 或 Switch.Default 作为子元素');
    return null;
  });

  // 如果有匹配的 Case，返回匹配内容
  const matchedContent = renderContent?.find(content => content !== null);
  if (matchedContent) {
    return <Fragment>{matchedContent}</Fragment>;
  }

  // 否则返回 Default 内容
  return <Fragment>{defaultElement}</Fragment>;
};
Switch.Case = Case;
Switch.Default = Default;
export default Switch;