export type Command<CommandType extends string = string> = {
  __type: CommandType;
}