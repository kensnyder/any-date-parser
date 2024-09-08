export default function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root
    .find(j.CallExpression, { callee: { name: 'require' } })
    .filter(path => path.parent.node.type === 'VariableDeclarator')
    .forEach(path => {
      const variableDeclarator = path.parent.node;
      const importDeclaration = j.importDeclaration(
        [j.importDefaultSpecifier(variableDeclarator.id)],
        path.node.arguments
      );
      j(path.parent.parent).replaceWith(importDeclaration);
    });

  return root.toSource();
}
