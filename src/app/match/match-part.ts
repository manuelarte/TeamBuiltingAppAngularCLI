export class MatchPart {
    startingTime: Date;
    endingTime: Date;

    getDuration(): number {
      return new Date(this.endingTime).getTime() - new Date(this.startingTime).getTime();
    }
}
