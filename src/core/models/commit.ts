import { sprintf } from 'sprintf-js';
import { capitalize } from 'lodash';
import moment from 'moment';

export class CommitModel {
  public hash: string;
  public author: string;
  public date: Date;
  public type: string;
  public task: number = null;
  public subject: string;
  public description: string;
  public isLoggable = false;

  public setDate(date: string): void {
    this.date = moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
  }

  public setSubject(subject: string, raw: string): void {
    this.isLoggable = raw.includes('[log]');

    const match = /:\s(.*)?/gm.exec(subject);
    if (match !== null) {
      this.subject = match[1].replace(/"/g, '');
      this.setBody(this.subject);
    }

    this.setTask(subject);
    this.setType(subject);
  }

  public setBody(value: string): void {
    if (!this.isLoggable) return;
    if (value.trim() === '') return;
    this.description = value;
    this.sanitizeDescription();
  }

  public setTask(subject: string): void {
    const match = /\((\d+)?\)/gm.exec(subject);
    if (match !== null) {
      this.task = Number.parseInt(match[1], 10);
    }
  }

  public setType(subject: string): void {
    const match = /^(.*?)[:([]/gm.exec(subject);
    if (match !== null) {
      this.type = match[1];
    }
  }

  public getTask(): string {
    if (this.task === null) return '';
    return sprintf('[DEV-%(task)s](https://jira.vigilance.local/browse/DEV-%(task)s)', { task: this.task });
  }

  public toString(): string {
    let template = '- [%(date)s] %(task)s\r\n\t%(description)s';
    const info = {
      task: this.getTask(),
      description: this.description,
      date: moment(this.date).format('YYYY-MM-DD')
    };

    if (this.task === null) {
      template = '- [%(date)s] %(description)s';
    }

    return sprintf(template, info);
  }

  private sanitizeDescription(): void {
    this.description = this.description
      .split('\n')
      .filter((line) => line.trim() !== '' && line !== '[log]')
      .map((line) => {
        line = capitalize(line);

        if (!line.endsWith('.')) {
          line += '.';
        }

        return line;
      })
      .join('\n');
  }
}
