import dedent from 'dedent';
import moment from 'moment';
import { CommitModel } from '../models/commit';
import { groupBy, orderBy } from 'lodash';
import { injectable } from 'inversify';

@injectable()
export class ChangelogGenerator {
  public generate(list: CommitModel[], version: string, repo: string, branch = 'master'): string {
    // Retirer les commits qui ne vont pas dans le changelog.
    // Trier les commits par type
    const grouped = groupBy(
      orderBy(
        list.filter((commit) => commit.isLoggable),
        ['date', 'description'],
        ['asc', 'asc']
      ),
      (commit) => commit.type.replace(/"/gm, '')
    );

    const change = dedent(`${this.generateHeader(grouped, version, repo, branch)}
    
    ${this.generateFeature(grouped)}
    
    ${this.generateCorrectif(grouped)}
    
    ${this.generareChange(grouped)}
    
    ${this.generateAdd(grouped)}
    
    ${this.generateRemove(grouped)}
    
    ${this.generateOthers(grouped)}
    `);

    return change;
  }

  private generateHeader(grouped: any, version: string, repo: string, branch = 'master'): string {
    return dedent(`## [[${version}] - ${moment().format('YYYY-MM-DD')}](https://git.vigilance.local/${repo}/blob/${branch}/CHANGELOG.md)
    
    ${this.getLogsLine(grouped.maintenance)}
    `).trim();
  }

  private generateFeature(grouped: any): string {
    return dedent(`#### Nouvelles fonctionnalités
    
    ${this.getLogsLine(grouped.feature)}
    `).trim();
  }

  private generateCorrectif(grouped: any): string {
    return dedent(`
    #### Correctifs
    
    ${this.getLogsLine(grouped.fix)}
    `).trim();
  }

  private generareChange(grouped: any): string {
    return dedent(`
    #### Changements
    
    ${this.getLogsLine(grouped.change)}
    `).trim();
  }

  private generateAdd(grouped: any): string {
    return dedent(`
    #### Ajouts
    
    ${this.getLogsLine(grouped.add)}
    `).trim();
  }

  private generateRemove(grouped: any): string {
    return dedent(`    
    #### Retraits
    
    ${this.getLogsLine(grouped.remove)}
    
    ${this.getLogsLine(grouped.deprecate)}
    `).trim();
  }

  private generateOthers(grouped: any): string {
    return dedent(`
    #### Autres
    
    ${this.getLogsLine(grouped.test)}
    
    ${this.getLogsLine(grouped.doc)}
    
    ${this.getLogsLine(grouped.chore)}
    `).trim();
  }

  private getLogsLine(logs: CommitModel[]): string {
    if (!logs) return '';
    return logs.map((log) => log.toString()).join('\r\n\r\n');
  }
}
