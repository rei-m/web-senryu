import makeStyles from '@material-ui/core/styles/makeStyles';
import { Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
import { ThemeInterface } from './theme';
import { StylesHook } from '@material-ui/styles/makeStyles';

const appMakeStyles = <P extends {} = {}>(
  styles: Styles<ThemeInterface, P, string>,
  options?: Omit<WithStylesOptions<ThemeInterface>, 'withTheme'>
): StylesHook<Styles<ThemeInterface, P, string>> =>
  makeStyles<ThemeInterface, P>(styles, options);

export default appMakeStyles;
