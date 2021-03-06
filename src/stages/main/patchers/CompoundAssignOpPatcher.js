import AssignOpPatcher from './AssignOpPatcher.js';
import type { SourceToken } from './../../../patchers/types.js';
import { OPERATOR } from 'coffee-lex';

export default class CompoundAssignOpPatcher extends AssignOpPatcher {
  getOperatorToken(): SourceToken {
    let operatorIndex = this.indexOfSourceTokenBetweenPatchersMatching(
      this.assignee,
      this.expression,
      token => token.type === OPERATOR
    );
    if (!operatorIndex) {
      throw this.error(
        `expected OPERATOR token between assignee and expression`,
        this.assignee.outerEnd,
        this.expression.outerStart
      );
    }
    return this.sourceTokenAtIndex(operatorIndex);
  }

  /**
   * If `LHS` needs parens then `LHS += RHS` needs parens.
   */
  statementNeedsParens(): boolean {
    return this.assignee.statementShouldAddParens();
  }
}
