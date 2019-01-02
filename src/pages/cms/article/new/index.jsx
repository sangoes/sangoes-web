import React, { Component } from 'react';
import styles from './index.less';
import { Modal, Form, Input } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/color-picker.css';
import ColorPicker from 'braft-extensions/dist/color-picker';

const FormItem = Form.Item;

BraftEditor.use(
  ColorPicker({
    includeEditors: ['editor-with-color-picker'],
    theme: 'light', // 支持dark和light两种主题，默认为dark
  })
);
/**
 * 新建文章
 */
@Form.create()
export default class NewArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: BraftEditor.createEditorState(),
    };
  }
  // 当富文本发送变化
  _handleChange = editorState => {
    this.setState({ editorState });
  };
  // 预览
  _preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(this._buildPreviewHtml());
    window.previewWindow.document.close();
  };
  // 渲染html
  _buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `;
  }
  // 保存
  _save = () => {};
  // 确定
  _onOkHandle = () => {};
  // 渲染
  render() {
    const { visible, onCancel, form } = this.props;
    // 扩展
    const extendControls = [
      { key: 'save', type: 'button', text: '保存', onClick: this._save },
      { key: 'preview', type: 'button', text: '预览', onClick: this.preview },
    ];
    return (
      <Modal
        destroyOnClose
        width="70%"
        title={'新建文章'}
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        {/* 文章分类 */}
        <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 15 }} label="文章分类">
          {form.getFieldDecorator('catogy', {
            // initialValue: userItem && userItem.realName,
            rules: [{ required: true }],
          })(<Input placeholder="文章分类" />)}
        </FormItem>
        {/* 文章标题 */}
        <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 15 }} label="文章标题">
          {form.getFieldDecorator('title', {
            // initialValue: userItem && userItem.realName,
            rules: [{ required: true, message: '文章标题最少2最多30', min: 2, max: 30 }],
          })(<Input placeholder="文章标题" />)}
        </FormItem>
        {/* 文章正文 */}
        <FormItem labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="文章正文">
          {form.getFieldDecorator('content', {
            // initialValue: userItem && userItem.realName,
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: '文章正文不能为空' }],
          })(
            <BraftEditor
              className={styles.editor}
              onChange={this._handleChange}
              extendControls={extendControls}
              contentStyle={{ height: 400 }}
            />
          )}
        </FormItem>
      </Modal>
    );
  }
}
