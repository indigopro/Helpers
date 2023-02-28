export class Script {
  private $scope: string = ''
  private $content: string | undefined = undefined

  get scope() {
    return {
      add: (content: string) => {
        this.$scope = `${this.$scope}\n${content}`
      },
    }
  }

  set content(value: string) {
    this.$content = value
  }

  resolve(): any {
    const script = `${this.$scope}\nreturn ${this.$content};`
    return Function(script)()
  }
}
