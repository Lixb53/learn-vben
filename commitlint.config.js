module.exports = {
  // ↓忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // ↓按照传统消息格式来验证
  extends: ['@commitlint/config-conventional'],
  // ↓这里是自定义解析器
  // ↓https://commitlint.js.org#/reference-configuration?id=parser-presets
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved',
      ],
      issuePrefixes: ['#'],
      noteKeywords: ['BREAKING CHANGE', '不兼容变更'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      warn() {},
      mergePattern: null,
      mergeCorrespondence: null,
    },
  },
  // ↓自定义提交消息规则
  rules: {
    // ↓body以空白行开头
    'body-leading-blank': [2, 'always'],
    // ↓footer以空白行开头
    'footer-leading-blank': [1, 'always'],
    // ↓header的最大长度
    'header-max-length': [2, 'always', 108],
    // ↓subject为空
    'subject-empty': [2, 'never'],
    // ↓type为空
    'type-empty': [2, 'never'],
    // ↓type的类型
    'type-enum': [
      2,
      'always',
      [
        // 新功能
        'feat',
        // 修补bug
        'fix',
        // 优化相关，如提升性能、用户体验等
        'perf',
        // 仅仅是对格式进行修改，如逗号、缩进、空格等。不改变代码逻辑
        'style',
        // 文档(documentation)
        'docs',
        // 测试用例，包括单元测试、集成测试。
        'test',
        // 代码重构，没有新增功能或修复bug
        'refactor',
        'build',
        'ci',
        //  改变构建流程、或者增加依赖库、工具等
        'chore',
        // 版本回滚
        'revert',
        'wip',
        'workflow',
        'types',
        // 用于说明 commit 影响的范围，比如: views, component, utils, test...
        'scope',
        // commit 目的的简短描述
        'subject',
      ],
    ],
  },
};
